const init = async () => {
    const allUser = await fetch(
        "http://localhost:5000/apis/user", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
    allUser.forEach((element) => addUser(element));
}

const addUser = (element) => {
    const item = document.createElement("div"); //สร้าง div
    item.className = "card"; //กำหนดชื่อ class
    item.style = "width: 20rem;" //กำหนด style
    //6-14 เป็นการกำหนด HTML มีการแทรก ข้อมูลลงไปด้วย
    const card = `    
    <img src="${element.imageurl}" class="card-img-top" alt="${element.name}">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">${element.Tel}</p>
      <a href="#" class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</a>
      <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>
    </div>
    `;
    item.innerHTML = card;  //เอาไปแทรกที่card ลงใน div
    const userElement = document.querySelector(".user"); //เข้าถึง class หน้า HTML
   userElement.appendChild(item); //เพิ่มลงไป
}

const removeAllResult = () => {
    const userElement = document.querySelector(".user");
    userElement.innerHTML = "";
}

const deleteUser = async (id) => { //รับไอดีที่ส่งมา
    if (id) { //เช็ค id
        try {
            const user = await fetch(
                "http://localhost:5000/apis/user/" + id, { //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //DELETE
                mode: "cors",
                cache: "no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals: "same-origin",
                headers: {
                    "Content-type": "application/json"  //ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response) => {
                return response.json();  //ส่งค่าในรูปแบบ json
            }).then(() => {
                alert(`User id:${id} is Delete`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`User id:${id} not found!!`);
        }
    } else {
        alert("User ID is missing")
    }
}