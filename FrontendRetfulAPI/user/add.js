const add = async () => {
   
    const name = document.getElementById("name").value;         //เก็บค่าจาก input
    const password = document.getElementById("password").value;
    const Tel = document.getElementById("Tel").value;
    const imageurl = document.getElementById("imageurl").value;
    if ( name && password && Tel && imageurl) { //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
      const params = { //set พารามิเตอร์
        
        name: name,
        password: password,
        Tel: Tel,
        imageurl: imageurl,
      };
      try {
        const user = await fetch( //ส่งไปยัง server
          "http://localhost:5000/apis/user",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params), // เพิ่ม data
          }
        ).then((response) => {
          return response.json(); //คอนเวิดให้อยู่ในรูปแบบ json
        }).then(() => {
          alert(`รหัสผู้ใช้:${name}เพื่มให้แล้ว ขอรับนายน้อย`);
          location.replace("user.html");
        });
      } catch (error) {
        alert(`เพิ่มผู้ใช้ใหม่แล้ว ขอรับนายน้อย`);
      }
    } else {
      alertalert("กรุณาใส่ให้ครบทุกช่องด้วย ขอรับนายน้อย!!");
    }
  };