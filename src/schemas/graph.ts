import {
    type Node as XYNode,
    type Edge as XYEdge,
} from "@xyflow/react";


export interface NodeData {
    displayName: string;
    values: Record<string, any>;

    [key: string]: unknown;
}

export type NodeType = XYNode<NodeData, "custom">;

export interface EdgeData {
    [key: string]: unknown;
}

export type EdgeType = XYEdge<NodeData, "custom">;