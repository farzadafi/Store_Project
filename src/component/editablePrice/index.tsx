import React, {useState} from "react";
import {BsPencilSquare} from "react-icons/bs";

interface EditablePriceProps {
  price: number;
  onSave: (newPrice: number) => void;
  classes?: string
}

function EditablePrice({ price, onSave, classes }: EditablePriceProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(price);

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedPrice(+event.target.value);
  };

  const handleInputBlur = (): void => {
    setIsEditing(false);
    onSave(editedPrice);
  };

  if (isEditing) {
    return (
      <td className="max-sm:pr-2 p-2">
        <input type="number" value={editedPrice} onChange={handleInputChange} onBlur={handleInputBlur}
               className={"flex justify-center gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}/>
      </td>
    );
  } else {
    return (
      <td className="max-sm:pr-2 p-2">
        <p onClick={handleEditClick}
           className={`flex justify-center gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg cursor-pointer ${classes}`}>
          <BsPencilSquare/>
          {price}
        </p>
      </td>
    );
  }
}

export default EditablePrice;