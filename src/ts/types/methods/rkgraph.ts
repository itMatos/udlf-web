export interface RKGraph {
    K: number;
    T: number;
    P: number;
    L: number;
}

export interface RkGraphSettingsProps {
    settings: RKGraph;
    setSettings: (settings: RKGraph) => void;
}

export interface RKGraphConfigParams {
    PARAM_RKGRAPH_K: number;
    PARAM_RKGRAPH_T: number;
    PARAM_RKGRAPH_P: number;
    PARAM_RKGRAPH_L: number;
}