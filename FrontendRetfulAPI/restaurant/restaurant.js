const init = async () => {
    const allRestaurants = await fetch(
        "http://localhost:5000/apis/restaurant", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
    allRestaurants.forEach((element) => addRestaurant(element));
}

const reloadPage = async () =>{
    location.reload();
}


//สร้าง tag สำหรับโชว์
const addRestaurant = (element) => {
    const item = document.createElement("div");
    item.className = "card";
    //item.style = "width:20rem";

    const card = `
        <img src="${element.imageurl}" alt="${element.name}">
        <div class="stargroup">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <h5>${element.type}</h5>
        <h2>${element.name}</h2>
        <div class="card-icon">
            <div class="editResBox">
                <a href="editRestaurant.html?id=${element.id}"><i class="fas fa-pencil-alt"> </i>edit</a>
            </div>
            <div class="deleteResBox">
                <a href="" onclick="deleteRestaurent(${element.id})"><i class="fas fa-trash-alt"></i> delete</a>
            </div>
        </div>
    `;
    item.innerHTML = card;
    const restaurantElement = document.querySelector(".row");
    restaurantElement.appendChild(item);

}


const deleteRestaurent = async (id) => { //รับไอดีที่ส่งมา
    if (id) { //เช็ค id
        try {
            const restaurent = await fetch(
                "http://localhost:5000/apis/restaurant/" + id, { //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
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
                alert(`ลบร้านนี้แล้วขอรับนายน้อย`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`ร้านอาหาร:${name} ไม่พบ ขอรับนายน้อย!!`);
        }
    } else {
        //alert("Restaurent is missing")
    }
}


// ลบรูปเก่าที่ค้นหา
const removePre = () => {
    const restaurantElement = document.querySelector(".row");
    restaurantElement.innerHTML = "";

}

//ค้นหารูป
const searchRestaurant = async (event) => {
    const keyword = event.target.value;
    
    if (event.key === "Enter" && keyword) {
        const allRestaurants = await fetch('http://localhost:5000/apis/restaurant',
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
        const result = allRestaurants.filter(
            (item) => item.name.includes(keyword) || item.type.includes(keyword)
        );
        // console.log(result);

        //ใช้ forEach ส่ง element ไป ในmetthod เพื่อสร้างข้อมูลออกมา
        removePre();
        result.forEach((element) => addRestaurant(element));
    }
}

const main = () => {
    const inputElement = document.querySelector(".search")
    inputElement.addEventListener("keydown", searchRestaurant)

};

main();









