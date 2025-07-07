import ExecuteConfig from "@/components/ExecuteConfig";
import React from "react";

export default function ExecutePage({
  configFileToExecute,
  configFileName,
}: {
  configFileToExecute: Blob;
  configFileName: string;
}) {
  return (
    <React.Fragment>
      <ExecuteConfig configFileToExecute={configFileToExecute} configFileName={configFileName} />
    </React.Fragment>
  );
}
