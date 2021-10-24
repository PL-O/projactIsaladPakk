const addRestaurant = async () => {
    const name = document.getElementById("name").value;         //เก็บค่าจาก input
    const Type = document.getElementById("Type").value;
    const imageurl = document.getElementById("imageurl").value;
    if ( name &&  Type && imageurl) { //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
      const params = { //set พารามิเตอร์
        name: name,
        Type: Type,
        imageurl: imageurl,
      };
      try {
        const restaurant = await fetch( //ส่งไปยัง server
          "http://localhost:5000/apis/restaurant",
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
          alert(`เพิ่มร้านให้แล้วขอรับ นายน้อย`);
          location.replace("restaurant.html");
        });
      } catch (error) {
        alert(`ใส่ข้อมูลร้านใหม่ด้วยนายน้อย!`);
      }
    } else {
      alertalert("เพิ่มล้มเหลวขอรับ นายน้อย!");
    }
  };