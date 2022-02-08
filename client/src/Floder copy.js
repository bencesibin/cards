import { useState } from 'react';

export default function Folder({ explorer }) {
  const [expand, setexpand] = useState(explorer.expand);
  // if (explorer && explorer.type == "folder") {
  if (explorer && explorer.type == "folder") {
    // console.log(explorer.child);
    return (
      <div className='Floder'>
        <span onClick={() => { setexpand(!expand); console.log(expand); }} > {explorer.name} <br /> </span>
        <div className='expand' hidden={!expand}>
          {explorer.child.map((child, childIndex) => {
            // console.log(child);
            return <Folder key={childIndex} explorer={child} />
            // return <span key={childIndex}> {child.name} <br /></span>
          })}
        </div>
      </div>
    )
  } else {
    return <div>
      <span> {explorer.name} </span>
    </div>
  }
}

