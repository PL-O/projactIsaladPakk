const init = async () => {
    //ดึง id || query string มา จาก URL
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if (id) {
            
        try {
            const user = await fetch("http://localhost:5000/apis/user/" + id,
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
            document.getElementById("id").value = user.id;
            document.getElementById("name").value = user.name;
            document.getElementById("password").value = user.password;
            document.getElementById("Tel").value = user.Tel;
            document.getElementById("imageurl").value = user.imageurl;

            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imageurl";
            // item.src = user.imageurl;

        } catch (error) {
            alert(`User ID:${id} not found`)
        }
    } else {
        // alert(`User ID is missing`);
    }
};

// แก้ไขข้อมูล เพิ่มข้อมูลใหม่
const edit = async () => {
    const id = document.getElementById("id").value;
    if (id) {
        const params = {
            // id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            Tel: document.getElementById("Tel").value,
            imageurl: document.getElementById("imageurl").value,
        };

        const user = await fetch("http://localhost:5000/apis/user/" + id,
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
            alert(`User ID:${id}is updated!`);
            location.replace("user.html");
        });
    }
    else {
        // alert(`Restaurant ID is missing!`);
    }
}

init();
edit();