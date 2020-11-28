var result1="";

  $('#search_doctor').on('click',(e)=>{
    e.preventDefault()
      result1='';
        var speciality =$("#listbox").val();
        console.log(speciality);
        alert("working");

        $.ajax({
            url:'/filterDoctor',
            method:'post',
            data:{speciality:speciality},
            success:function(result,status,xhr){

                
                        for (var i = 0; i < result.array.length; i++) {
                            result1 +=
                              `
                              </li>
                                <li class="search-item">
                                    <div class="doctor-container">
                                        <div style="display: flex;align-items: center;justify-content: space-between;">
                                        <div class="doctor-info-container">
                                                <div class="profile-image">
                                                    <img src="/images/profile.png" alt="profile-photo" width="100px" height="100px">
                                                </div>
                                                <div class="profile-info">
                                                    <h2 class="heading-post">Dr. ${result.array[i].name}</h2>
                                                    <p class="big">Speciality : ${result.array[i].speciality}</p>
                                                </div>
                                        
                                        </div>
                                        <div class="rating">
                                            <h2 class="big">Ratings</h2>
                                            <img src="/images/star.png" alt="star" width="20px" height="20px">
                                            <img src="/images/star.png" alt="star" width="20px" height="20px">
                                            <img src="/images/star.png" alt="star" width="20px" height="20px">
                                            <img src="/images/star.png" alt="star" width="20px" height="20px">
                                            <img src="/images/star (1).png" alt="star" width="20px" height="20px">
                                            <p class="small">4.0/5.0</p>
                                        </div>

                                    </div>
                                        <button class="book-appointment-button" type="submit" >Book an Appointment</button>
                                    </div>
                                </li>
                                `
                        }
                            
                            $('.search-result-list').html(result1);
                     
               
                
            },
            error:function(xhr,status,error){
                console.log("error");
            }
    
       });
  })