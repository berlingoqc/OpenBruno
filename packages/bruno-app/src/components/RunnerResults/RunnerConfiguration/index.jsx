import { Inspector } from 'react-inspector';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { useTheme } from 'providers/Theme/index';

import StyledWrapper from './StyledWrapper';
import { useState } from 'react';

// copy from packages/bruno-app/src/components/VariablesEditor/index.js

const KeyValueExplorer = ({ data = [], theme }) => {
  const [showSecret, setShowSecret] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <SecretToggle showSecret={showSecret} onClick={() => setShowSecret(!showSecret)} />
      <table className="border-collapse">
        <tbody>
          {data.map((envVar) => (
            <tr key={envVar.name}>
              <td className="px-2 py-1">{envVar.name}</td>
              <td className="px-2 py-1">
                <Inspector
                  data={!showSecret && envVar.secret ? maskInputValue(envVar.value) : envVar.value}
                  theme={theme}
                />
              </td>
            </tr>
          ))}
          {isAdding ? (
            <tr key="tmp">
              <td className="px-2 py-1">
                <input type="text"></input>
              </td>
              <td className="px-2 py-1">
                <input type="text"></input>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div>
        <button  onClick={(e) => setIsAdding(true)}>add</button>
      </div>
    </div>
  );
};


const Variables = ({ variables, theme }) => {
  const variablesFound = Object.keys(variables).length > 0;

  const variableArray = Object.entries(variables).map(([name, value]) => ({
    name,
    value,
    secret: false
  }));

  return (
    <>
      <h1 className="font-semibold mb-2">Runtime Variables</h1>
      {variablesFound ? (
        <KeyValueExplorer data={variableArray} theme={theme} />
      ) : (
        <div className="muted text-xs">No variables found</div>
      )}
    </>
  );
};

const SecretToggle = ({ showSecret, onClick }) => (
  <div className="cursor-pointer mb-2 text-xs" onClick={onClick}>
    <div className="flex items-center">
      {showSecret ? <IconEyeOff size={16} strokeWidth={1.5} /> : <IconEye size={16} strokeWidth={1.5} />}
      <span className="pl-1">{showSecret ? 'Hide secret variable values' : 'Show secret variable values'}</span>
    </div>
  </div>
);


export default function RunnerConfiguration({ collection, specificRun, setSpecificRun }) {
  const { storedTheme } = useTheme();
  const dispatch = useDispatch();

  const reactInspectorTheme = storedTheme === 'light' ? 'chromeLight' : 'chromeDark';


  const [collectionFolders, setCollectionFolders] = useState(null);
  const [runVariables, setRunVariables] = useState([]);

  const handleFolderSelected = (event, index) => {
    const newCollectionFolders = collectionFolders.map((f, i) => { if (i == index) { f.selected = !f.selected; } return f;})

    setCollectionFolders(newCollectionFolders)
  };


  return (
    <StyledWrapper>
        <div className="flex">
          <div className="mt-6">
            <div>Select specific folder</div>
            {collectionFolders && collectionFolders.length ? collectionFolders.map((item, index) => {
              return (
                <div key={item.folder.uid} className="flex">
                  <input type="checkbox" checked={item.selected} tabIndex="-1" className="mr-3 mousetrap" onChange={(e) => handleFolderSelected(e, index)} />
                  <p>{item.folder.name}</p>
                </div>
              );
            }) : null}
            <p></p>
          </div>

          <div className="mt-6">
            <Variables variables={collectionCopy.runtimeVariables} theme={reactInspectorTheme}></Variables>
          </div>
          
          <div className="mt-6">
            <Variables variables={runVariables} theme={reactInspectorTheme}></Variables>


          </div>

        </div>
    </StyledWrapper>
  )




}
