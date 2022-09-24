import React, { useState } from "react";

function NewPost() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <div>
        <div>
          <input type="text" placeholder="Enter title name here" />
        </div>
        <div>Extra stuff</div>
        <div>
          <textarea placeholder="Enter content here" />
        </div>
      </div>
      <div>
        <button>submit</button>
      </div>
    </div>
  );
}

export default NewPost;
