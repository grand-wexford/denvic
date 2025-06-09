import {
    createSlice,
    type PayloadAction
} from '@reduxjs/toolkit';

import {
    type NodeType,
    type EdgeType,
} from "@/schemas";


interface InitialState {
    nodes: NodeType[];
    edges: EdgeType[];
}

const initialState: InitialState = {
    nodes: [],
    edges: [],
};

const graphSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setNodes: (state, action: PayloadAction<NodeType[]>) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action: PayloadAction<EdgeType[]>) => {
            state.edges = action.payload;
        },
    },
});

export const {
    setNodes,
    setEdges,
} = graphSlice.actions;
export default graphSlice.reducer;
