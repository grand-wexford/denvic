import {useAppDispatch} from "./useAppDispatch";
import {useAppSelector} from "./useAppSelector";

import {
    setNodes as setNodesAction,
    setEdges as setEdgesAction,
} from "@/store/slices/graphSlice.ts";

import {
    type NodeType,
    type EdgeType
} from "@/schemas";


export const useGraph = () => {
    const dispatch = useAppDispatch();

    const nodes = useAppSelector((state) => state.graph.nodes);
    const edges = useAppSelector((state) => state.graph.edges);

    const setNodes = (newNodes: NodeType[]) => {
        dispatch(setNodesAction(newNodes));
    };

    const setEdges = (newEdges: EdgeType[]) => {
        dispatch(setEdgesAction(newEdges));
    };

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
    };
}