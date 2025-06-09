import React from 'react';

import {
    Handle,
    Position,
    type NodeProps
} from '@xyflow/react';

import {
    type NodeType
} from "@/schemas";
import DictionaryTable from "@/components/DictTable.tsx";


const Node: React.FC<NodeProps<NodeType>> = (props) => {

    const {
        data,
        selected
    } = props;

    return (
        <div
            style={{
                border: selected ? "2px solid #0070f3" : "2px solid #c1c1c1",
                borderRadius: "10px",
                padding: "10px",
                background: "#FFFCFF",
                boxShadow: selected
                    ? "0 0 10px rgba(0, 112, 243, 0.5)"
                    : "none",
                transition: "box-shadow 0.2s, border 0.2s"
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                <strong>{data.displayName}</strong>
            </div>
            <div>
                <Handle
                    type='target'
                    position={Position.Left}
                />
                <Handle
                    type='source'
                    position={Position.Right}
                />
            </div>
            <DictionaryTable data={data.values}/>
        </div>
    )
}

export default Node;