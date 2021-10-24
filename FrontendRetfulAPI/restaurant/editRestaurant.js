const init = async () => {
    //ดึง id || query string มา จาก URL
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if (id) {
        try {
            const restaurant = await fetch("http://localhost:5000/apis/restaurant/" + id,
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
            });

            //set ค่าสำหรับ ที่จะแก้
            document.getElementById("id").value = restaurant.id;
            document.getElementById("name").value = restaurant.name;
            document.getElementById("Type").value = restaurant.type;
            document.getElementById("imageurl").value = restaurant.imageurl;

            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imageurl";
            // item.src = user.imageurl;

        } catch (error) {
            alert(`ไม่พบร้านอาหาร ขอรับนายน้อย`)
        }
    } else {
        // alert(`Restaurant ID is missing`);
    }
};

// แก้ไขข้อมูล เพิ่มข้อมูลใหม่
const editRestaurant = async () => {
    const id = document.getElementById("id").value;
    if (id) {
        const params = {
            // id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            type: document.getElementById("Type").value,
            imageurl: document.getElementById("imageurl").value,
        };
        const restaurant = await fetch("http://localhost:5000/apis/restaurant/" + id,
            {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                //เพิ่ม body แปลง json เป็น text เข้าไปใน DB
                body: JSON.stringify(params),
            }
        ).then((response) => {
            return response.json();
        }).then(() => {
            alert(`รหัสร้านอาหาร:${name}เพื่มให้แล้ว ขอรับนายน้อย!`);
            location.replace("restaurant.html");
        });
    }
    else {
        //alert(`เพิ่มล้มเหลวขอรับ นายน้อย!`);
    }
}

init();
editRestaurant();