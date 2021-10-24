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

const reloadPage = async () =>{
    location.reload();
}

//แก้ไข ข้อมูล
const editUser = async (id) => {
    if (id) {
        try {
            const user = await fetch("http://localhost:5000/apis/user/" + id,
                {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`แก้ไขข้อมูลของ id:${id} เรียบร้อย`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ")
    }
};


//ลบ ข้อมูล
const deleteUser = async (id) => {
    if (id) {
        try {
            const user = await fetch("http://localhost:5000/apis/user/" + id,
                {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`ลบ id:${id} ลบแล้วจ้า`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ ius")
    }
};

//สร้าง tag สำหรับโชว์
const addUser = (element) => {
    const item = document.createElement("div");
    item.className = "card";
    //item.style = "width:20rem";

    const card = `
    <img src="${element.imageurl}" alt="${element.name}">
    <h2>${element.name}</h2>
    <h5>${element.Tel}</h5>
    <div class="card-icon">
        <div class="editUser">
            <a href="edit.html?id=${element.id}" ><i class="fas fa-user-edit"></i></a>
        </div>
        <div class="deleteUser">
            <a href="" onclick="deleteUser(${element.id})"><i class="fas fa-trash-alt"></i></a>

        </div>
    </div>`;
    item.innerHTML = card;
    const userElement = document.querySelector(".row");
   userElement.appendChild(item);


}

// ลบรูปเก่าที่ค้นหา
const removePre = () => {
    const userElement = document.querySelector(".row");
   userElement.innerHTML = "";

}


//ค้นหารูป
const searchUser = async (event) => {
    const keyword = event.target.value;
    if (event.key === "Enter" && keyword) {
        const allUser = await fetch('http://localhost:5000/apis/user',
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            return response.json();
        }
        );
        // console.log(keyword);
        // console.log(allRestaurants);

        // ค้นหา 2 อย่าง จากคำที่พิมมา
        const result = allUser.filter(
            (item) => item.name.includes(keyword) || item.Tel.includes(keyword)
        );
        // console.log(result);

        //ใช้ forEach ส่ง element ไป ในmetthod เพื่อสร้างข้อมูลออกมา
        removePre();
        result.forEach((element) => addUser(element));
    }
}

const main = () => {
    const inputElement = document.querySelector(".search")
    inputElement.addEventListener("keydown", searchUser)

};

main();
