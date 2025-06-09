import React from "react";

type Props = {
    data: Record<string, number>;
};

const thStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left"
};

const tdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px"
};

const DictionaryTable: React.FC<Props> = ({ data }) => {
    return (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
            <tr>
                <th style={thStyle}>Key</th>
                <th style={thStyle}>Value</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                    <td style={tdStyle}>{key}</td>
                    <td style={tdStyle}>{value.toFixed(4)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


export default DictionaryTable;
