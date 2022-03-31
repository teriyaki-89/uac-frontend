import React, { Fragment, useEffect, useState, createRef, useCallback } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface Label {
  [key: string]: string;
}

function ComboBox(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.options}
      renderInput={(params) => <TextField {...params} label="Search by name" />}
      onChange={(event: any, value) => props.onChange(value)}
      onInputChange={(event: any, value) => props.onChange(value)}
    />
  );
}

const UAC: React.FC = () => {
  const [data, setData] = useState<{ name: string; [key: string]: any }[]>([]);
  const [currentData, setCurrentData] = useState<{ name: string; [key: string]: any }[]>([]);
  const [options, setOptions] = useState<Label[]>([]);
  const [fields, setFields] = useState<string[]>([]);

  const renderFieldsNames = () => (
    <thead>
      <tr>
        {fields.map((field, id) => {
          return <th key={id}>{field}</th>;
        })}
      </tr>
    </thead>
  );

  const renderData = () => {
    return (
      <tbody>
        {currentData.map((row, id) => (
          <tr key={id}>
            {fields.map((field, iid) => {
              return <td key={iid}>{row[field]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries")
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.length) return;
        const fields = Object.keys(data[0]);
        setFields(fields);
        setData(data);
        setCurrentData(data);
        const options = data.reduce((res: Label[], cur, id) => {
          res.push(cur.name);
          return res;
        }, []);
        setOptions(options);
      });
  }, []);

  return (
    <div className="content">
      <ComboBox
        options={options}
        onChange={(value) => {
          if (!value) return setCurrentData(data);
          const newData = data.filter((item) => item.name.includes(value));
          setCurrentData(newData);
        }}
      />
      <div className="table">
        <table>
          {renderFieldsNames()}
          {renderData()}
        </table>
      </div>
    </div>
  );
};

export default UAC;
