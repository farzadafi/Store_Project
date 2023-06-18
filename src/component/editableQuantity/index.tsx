import React, {useState} from "react";
import {BsPencilSquare} from "react-icons/bs";

interface EditablePriceProps {
  quantity: number;
  onSave: (newQuantity: number) => void;
  classes?: string
}

function EditableQuantity({ quantity, onSave, classes }: EditablePriceProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedQuantity(+event.target.value);
  };

  const handleInputBlur = (): void => {
    setIsEditing(false);
    onSave(editedQuantity);
  };

  if (isEditing) {
    return (
      <td className="max-sm:pr-2 p-2">
        <input type="number" value={editedQuantity} onChange={handleInputChange} onBlur={handleInputBlur}
               className={"flex justify-center gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}/>
      </td>
    );
  } else {
    return (
      <td className="max-sm:pr-2 p-2">
        <p onClick={handleEditClick}
           className={`flex justify-center gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg cursor-pointer ${classes}`}>
          <BsPencilSquare/>
          {quantity}
        </p>
      </td>
    );
  }
}

export default EditableQuantity;