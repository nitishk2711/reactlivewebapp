import React ,{useEffect, useState}from 'react'
const img ="Todo.png";


//get the data from local storage 
// it will basically the hold tha data in the window or web page through the local storage
const getLocalData = () =>{
  const lists=localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

function Todo() {

  const [inputData,setInputData]=useState("");
  const [items ,setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("");
  const [toggleButton,setToggleButton]=useState(false);

  // here we add the item
  const addItem = () =>{
    if(!inputData){
      alert("plz fill the data")
    }else if(inputData && toggleButton){
        setItems(
          items.map((currElement) =>{
            if(currElement.id === isEditItem){
              return {...currElement, name : inputData};
            }
            return currElement;
          })
        );
        setInputData([])
        setIsEditItem(null);
        setToggleButton(false);
    }
    
    else{
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit the items

  const editItem = (index) =>{
    const item_todo_edited = items.find((currElement) =>{
      return currElement.id === index;
    })
    setInputData(item_todo_edited.name)
    setIsEditItem(index);
    setToggleButton(true);
  }
  //  delete the item

  const deleteItem =(index) =>{
    const updatedItem = items.filter((currElement) =>{
      return currElement.id !== index;
    });
    setItems(updatedItem);
  };

  // remove all the elements 

  const removeAll = () =>{
    setItems([]);
  };

  // adding locatstorage

  useEffect(() =>{
    localStorage.setItem("mytodolist",JSON.stringify(items))
  },[items])


  return (
    <>
      <div className='main_div'>
        <div className='child_div'>
          <figure>
            <img src={img} alt='todologo'/>
              <figcaption>Add your List Here ✌️</figcaption>
          </figure>
            <div className='addItems'>
              <input type='text' placeholder="📝 Add items" value={inputData} onChange={(e)=>setInputData(e.target.value)} />
              {toggleButton ? <i className="fa-solid fa-edit" onClick={addItem}></i> : <i className="fa-solid fa-plus" onClick={addItem}></i>}
            </div>
            {/* Show all items */}
            <div className='showItems'>

            {items.map((currElement) => {
              return(
                    <div className='eachItem' key={currElement.id}>
                      
                      <h3>{currElement.name}</h3>
                      <div className='todo-btn'>
                      <i className="fa-solid fa-edit" onClick={() => editItem(currElement.id)}></i>
                      <i className="fa-solid fa-trash" onClick={() =>deleteItem(currElement.id)}></i>
                      </div>
                    </div>
                    )
                })}
                </div>
              

            {/* remove all buttons */}
            <div className='showItems'>
              <button className='btn effect04'  data-sm-link-text="Remove All" onClick={removeAll}><span>Check LIst</span></button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Todo;