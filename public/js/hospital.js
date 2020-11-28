var myloc;
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }


var result1="";

  $('#search_hospital').on('click',(e)=>{
        // e.prevantDefaults();

        alert("working");

        $.ajax({
            url:'/getHospital',
            method:'post',
            success:function(result,status,xhr){
                        const mylocation = {lat:25.614884,lng:85.20};
                        var marker='';

                        

                        // navigator.geolocation.getCurrentPosition((position)=>{
                        //     console.log(position.coords);
                        //     const myposition = {lat:position.coords.latitude,lng:position.coords.longitude};
                        //     // const uluru = { lat: -25.344, lng: 131.036 };
                        //   // The map, centered at Uluru
                        //    map = new google.maps.Map(document.getElementById("map"), {
                        //     zoom: 5,
                        //     center: myposition,
                        //   });
                        //    marker = new google.maps.Marker({
                        //     position: myposition,
                        //     map: map,
                        //   });
                        const map = new google.maps.Map(document.getElementById("map"), {
                            zoom: 5,
                            center: mylocation
                        });
                
                        for (var i = 0; i < result.array.length; i++) {

                            const hospitalLocation = {lat:result.array[i].lat,lng:result.array[i].long};

                            console.log(hospitalLocation);

                           
                        
                               marker = new google.maps.Marker({
                                position: hospitalLocation,
                                map: map,
                                title:result.array[i].name
                              });


                            result1 +=
                              `
                              <li class="search-item">

                              <div class="hospital-item-container">
                                  <div class="hospital-info-container">
                                      <div class="profile-image">
                                          <img src="/images/hospital.png" alt="profile-photo" width="50px" height="50px">
                                      </div>
                                      <div class="profile-info">
                                          <h2 class="heading-post">${result.array[i].name}</h2>
                                          <p class="big">Address : ${result.array[i].address}</p>
                                          <p class="small">${result.array[i].website}</p>
                                      </div>
                                  </div>
                                  <div class="rating">
                                      <h2 class="big">Ratings</h2>
                                      <img src="/images/star.png" alt="star" width="20px" height="20px">
                                      <img src="/images/star.png" alt="star" width="20px" height="20px">
                                      <img src="/images/star.png" alt="star" width="20px" height="20px">
                                      <img src="/images/star.png" alt="star" width="20px" height="20px">
                                      <img src="/images/star (1).png" alt="star" width="20px" height="20px">
                                      <p class="small">${result.array[i].ratings}/5.0</p>
                                  </div>

                                  <div class="hospital-info-detailed">
                                      <p class="big">No of Vaccant Beds : ${result.array[i].vaccantbed}</p>
                                      <p class="big">Total Number of Doctors : ${result.array[i].nodoctors}</p>
                                      <p class="big"><b>Contact Number : ${result.array[i].contactnumber}</b></p>
                                  </div>
                              
                              </div>

                          </li>
                                `
                        }
                            
                            $('#search-hospital-container').html(result1);
                     
               
                
            },
            error:function(xhr,status,error){
                console.log("error");
            }
    
       });
  });


  function initMap() {
    // The location of Uluru

    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position.coords);
      const myposition = {lat:position.coords.latitude,lng:position.coords.longitude};
      // const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: myposition,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: myposition,
      map: map,
    });
  },(err)=>{
      console.log(err.message);
  });
   
  }



  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  
  
 