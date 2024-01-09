import React, { type FC } from "react";


export const FormDemo: FC = () => {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const values = Object.fromEntries(formData);
    console.log(values);
  };


  return (
    <form id="form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="text">文本</label><input type="text" name="text" id="text" />
      </div>
      <div>
        <label htmlFor="select">选择框</label><select name="select" id="select">
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
      <button type="submit" id="submit">Submit</button>
    </form>);
};

export default FormDemo;
