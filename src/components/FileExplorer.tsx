"use client";
import {
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  InsertDriveFile as FileIcon,
  Folder as FolderIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FileExplorerService } from "@/services/api/fileExplorer";
import type { FileExplorerProps, FileItem } from "@/ts/types/fileExplorer";

export default function FileExplorer({
  onFileSelect,
  selectedFiles = [],
  multiple = false,
  fileExtensions = [],
  allowDirectorySelection = false,
}: FileExplorerProps) {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/app/Datasets");
  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FileItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);

  const updateBreadcrumbs = useCallback((path: string) => {
    const pathParts = path.split("/").filter((part) => part !== "");
    // Always show breadcrumbs relative to Datasets, not app
    let breadcrumbParts: string[] = [];
    if (pathParts.length > 2 && pathParts[0] === "app" && pathParts[1] === "Datasets") {
      breadcrumbParts = pathParts.slice(2);
    } else if (pathParts.length > 1 && pathParts[0] === "Datasets") {
      breadcrumbParts = pathParts.slice(1);
    }
    setBreadcrumbs(breadcrumbParts);
  }, []);

  const loadDirectory = useCallback(
    async (path: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await FileExplorerService.listDirectory(path);
        if (response.success) {
          setItems(response.data.items);
          setCurrentPath(response.data.currentPath);
          updateBreadcrumbs(response.data.currentPath);
        } else {
          setError("Failed to load directory");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [updateBreadcrumbs]
  );

  const handleDirectoryClick = (item: FileItem) => {
    if (item.type === "directory") {
      if (allowDirectorySelection) {
        // In directory selection mode, set as selected but don't navigate
        setSelectedDirectory(item.path);
      } else {
        // Normal mode, navigate into directory
        loadDirectory(item.path);
      }
    }
  };

  const handleFileClick = (item: FileItem) => {
    if (item.type === "file") {
      if (multiple) {
        // Toggle selection for multiple files
        if (selectedFiles.includes(item.path)) {
          // Remove from selection
          const newSelection = selectedFiles.filter((path) => path !== item.path);
          onFileSelect(newSelection.join(","));
        } else {
          // Add to selection
          const newSelection = [...selectedFiles, item.path];
          onFileSelect(newSelection.join(","));
        }
      } else {
        onFileSelect(item.path);
        setOpen(false);
      }
    }
  };

  const handleSelectDirectory = () => {
    if (selectedDirectory) {
      onFileSelect(selectedDirectory);
      setOpen(false);
    }
  };

  const handleOpenDirectory = () => {
    if (selectedDirectory) {
      loadDirectory(selectedDirectory);
      setSelectedDirectory(null); // Clear selection when navigating
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const path = `/app/Datasets/${breadcrumbs.slice(0, index + 1).join("/")}`;
    loadDirectory(path);
  };

  const handleBackClick = () => {
    if (breadcrumbs.length > 1) {
      const parentPath = `/app/Datasets/${breadcrumbs.slice(0, -1).join("/")}`;
      loadDirectory(parentPath);
    } else if (breadcrumbs.length === 1) {
      // Go back to Datasets root
      loadDirectory("/app/Datasets");
    }
    // Remove navigation to /app root - always stay within Datasets
  };

  const handleHomeClick = () => {
    loadDirectory("/app/Datasets");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    setError(null);
    try {
      const response = await FileExplorerService.searchFiles(searchQuery, currentPath, 3);
      if (response.success) {
        setSearchResults(response.data.results);
      } else {
        setError("Search failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleRefresh = () => {
    loadDirectory(currentPath);
  };

  const isFileSelected = (filePath: string) => {
    return selectedFiles.includes(filePath);
  };

  const isFileAllowed = (fileName: string) => {
    if (fileExtensions.length === 0) {
      return true;
    }
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension && fileExtensions.includes(extension);
  };

  const filteredItems = items.filter((item) => item.type === "directory" || isFileAllowed(item.name));

  const displayItems = isSearching ? searchResults : filteredItems;

  useEffect(() => {
    if (open) {
      loadDirectory("/app/Datasets");
      setSelectedDirectory(null); // Clear selection when opening
    }
  }, [open, loadDirectory]);

  return (
    <>
      <Button onClick={() => setOpen(true)} startIcon={<FolderIcon />} variant="outlined">
        Browse Files
      </Button>

      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => setOpen(false)}
        open={open}
        PaperProps={{
          sx: { height: "70vh" },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FolderIcon />
            <Typography variant="h6">{allowDirectorySelection ? "Directory Explorer" : "File Explorer"}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Refresh">
              <IconButton disabled={loading} onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {allowDirectorySelection && (
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              Click to select a directory
            </Typography>
          )}
        </DialogTitle>

        <DialogContent>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link component="button" onClick={handleHomeClick} sx={{ display: "flex", alignItems: "center", gap: 0.5 }} variant="body2">
              <HomeIcon fontSize="small" />
              Datasets
            </Link>
            {breadcrumbs.map((crumb, index) => {
              const path = breadcrumbs.slice(0, index + 1).join("/");
              return (
                <Link
                  component="button"
                  key={`breadcrumb-${path}`}
                  onClick={() => handleBreadcrumbClick(index)}
                  sx={{ textDecoration: "none" }}
                  variant="body2"
                >
                  {crumb}
                </Link>
              );
            })}
          </Breadcrumbs>

          {/* Search */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search files..."
              size="small"
              value={searchQuery}
            />
            <Button disabled={isSearching} onClick={handleSearch} startIcon={<SearchIcon />} variant="outlined">
              Search
            </Button>
            {isSearching && (
              <Button
                onClick={() => {
                  setIsSearching(false);
                  setSearchResults([]);
                }}
                variant="text"
              >
                Cancel
              </Button>
            )}
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Loading */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {/* File List */}
          {!loading && (
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {/* Back button */}
              {breadcrumbs.length > 1 && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleBackClick}>
                    <ListItemIcon>
                      <ArrowBackIcon />
                    </ListItemIcon>
                    <ListItemText primary=".." />
                  </ListItemButton>
                </ListItem>
              )}

              {/* Directory and File Items */}
              {displayItems.map((item) => (
                <ListItem disablePadding key={item.path}>
                  <ListItemButton
                    disabled={item.type === "file" && !isFileAllowed(item.name)}
                    onClick={() => {
                      if (item.type === "directory") {
                        handleDirectoryClick(item);
                      } else {
                        handleFileClick(item);
                      }
                    }}
                    sx={{
                      opacity: (() => {
                        if (item.type === "file" && !isFileAllowed(item.name)) {
                          return 0.5;
                        }
                        return 1;
                      })(),
                      backgroundColor: (() => {
                        if (item.type === "directory" && allowDirectorySelection && selectedDirectory === item.path) {
                          return "action.selected";
                        }
                        return "transparent";
                      })(),
                      "&:hover": {
                        backgroundColor: (() => {
                          if (item.type === "directory" && allowDirectorySelection && selectedDirectory === item.path) {
                            return "action.selected";
                          }
                          return "action.hover";
                        })(),
                      },
                    }}
                  >
                    <ListItemIcon>
                      {(() => {
                        if (item.type === "directory") {
                          return <FolderIcon color={allowDirectorySelection ? "secondary" : "primary"} />;
                        }
                        return <FileIcon />;
                      })()}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      secondary={(() => {
                        if (item.type === "file" && item.size) {
                          return `${(item.size / 1024).toFixed(1)} KB`;
                        }
                        if (item.type === "directory") {
                          return "Directory";
                        }
                        return "";
                      })()}
                    />
                    {item.type === "file" && isFileSelected(item.path) && <CheckIcon color="primary" />}
                  </ListItemButton>
                </ListItem>
              ))}

              {displayItems.length === 0 && !loading && (
                <ListItem>
                  <ListItemText primary="No files found" sx={{ textAlign: "center" }} />
                </ListItem>
              )}
            </List>
          )}

          {/* Selected Files Display */}
          {selectedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom variant="subtitle2">
                Selected Files:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selectedFiles.map((filePath) => (
                  <Chip
                    key={filePath}
                    label={filePath.split("/").pop()}
                    onDelete={() => {
                      const newSelection = selectedFiles.filter((path) => path !== filePath);
                      onFileSelect(newSelection.join(","));
                    }}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          {allowDirectorySelection && selectedDirectory && (
            <>
              <Button onClick={handleOpenDirectory} variant="outlined">
                Abrir Diretório
              </Button>
              <Button onClick={handleSelectDirectory} variant="contained">
                Select Directory
              </Button>
            </>
          )}
          {multiple && !allowDirectorySelection && (
            <Button disabled={selectedFiles.length === 0} onClick={() => setOpen(false)} variant="contained">
              Select Files ({selectedFiles.length})
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
