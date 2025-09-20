import { useEffect, useState } from "react";
import "../css/welcome.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/loading.css';
import "../css/Profile.css";



export const Welcome = () => {
  
  //location is use to get the data passed using navigate
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Country, setCountry] = useState("Nepal");
  // const [City, setCity] = useState("Urlabari");
  const [PostalCode, setPostalCode] = useState("56604");

  // profile image (Base64)
  // const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  // edit state toggles
  const [isPersonalEditable, setIsPersonalEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  
  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second
  //   }
  // }, [])
  

  useEffect(() => {
      setLoading(true);
      setProgress(20); // Start slow

      const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward


          setProgress(100);
             setTimeout(() => {
               setLoading(false);
               setProgress(0);
               clearInterval(interval);
              }, 400);

    if (!user) {
      navigate("/login");
    }
    setName(user.fullName);
    setEmail(user.email);
    // setCity(user.city || "NA");
    setPostalCode(user.postalCode || "NA");
    setCountry(user.country || "NA");
    setPhone(user.phone || "NA");
    
  }, [user]);

  useEffect(() => {
  if (email) {
    fetch(`${host}/api/cricscore/scorer/image/${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return res.blob();
      })
      .then((blob) => {
        setProfileImageUrl(URL.createObjectURL(blob));
      })
      .catch((err) => {
        console.error("Image fetch error:", err);
        setProfileImageUrl("https://via.placeholder.com/150"); // fallback
      });
  }
}, [email]);



const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setProfileImageFile(file);
  setProfileImageUrl(URL.createObjectURL(file)); // instant preview

  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch(`${host}/api/cricscore/scorer/upload/${email}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    alert("Image uploaded successfully");
  } catch (error) {
    console.error("Image upload error:", error);
    alert("Failed to upload image");
  }
};


  const handleSave = async () => {
 

    const payload = {
      fullName:name,
      email:email,
      phone:phone,
      country: Country,
      postalCode: PostalCode,
    };
    try{

 const response = await fetch("http://localhost:5000/api/cricscore/scorer/update", {
        method: "PUT",
        credentials:"include",
        headers: {
           Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // send only what user typed
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
  alert("Scorer updated successfully!");
  localStorage.setItem("user", JSON.stringify(data.scorer));
  // setUser(data.scorer);
  navigate("/");

      } else {
        alert(data.message || "Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

      };


  const handlePersonalEdit = () => {
    if (isPersonalEditable) handleSave();
    setIsPersonalEditable(!isPersonalEditable);
  };

  const handleAddressEdit = () => {
    if (isAddressEditable) handleSave();
    setIsAddressEditable(!isAddressEditable);
  };

    return (
    
    <>
{loading && (
  <div className="loading-bar-container">
    <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
  </div>)}
    
      <div style={{ marginLeft: "2rem" }}>
        {user && (
    <div className="container">
      <fieldset className="p-3 rounded" style={{ background: "transparent",border:'3px dotted #1d4ed8' }}>
        <legend className="float-none w-auto px-2 ms-4">Profile</legend>

        {/* Profile Header */}
        <div className="profile-header mb-4 text-center">
          <div className="d-flex justify-content-center align-items-center position-relative">
            <img
              src={profileImageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle border border-3 shadow-sm"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />

            <span
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="position-absolute bottom-0 end-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="white"
                className="rounded-circle shadow-lg bg-success p-2 border border-3 border-light cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7
                      a7 7 0 0 0-5.468 11.37C3.242 11.226 
                      4.805 10 8 10s4.757 1.225 
                      5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="imageUpload"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-3 text-start">
            <h4 className="fw-bold">{name || "User Name"}</h4>
            <span className="text-muted">admin</span>
          </div>
        </div>

        {/* Personal Info */}
        <div id="personal_info" className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Personal Information</h3>
            <button
              type="button"
              className="btn btn-success"
              onClick={handlePersonalEdit}
            >
              {isPersonalEditable ? "Save" : "Edit"}
            </button>
          </div>
          <hr />
          <div className="row g-4">
            <div className="col-md">
              <span className="fw-semibold">Name</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                disabled={!isPersonalEditable}
              />
            </div>
            <div className="col-md">
              <span className="fw-semibold">Email</span>
              <input
                className="form-control border-0 bg-transparent"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isPersonalEditable}
              />
            </div>
            <div className="col-md">
              <span className="fw-semibold">Phone</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isPersonalEditable}
              />
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div id="address" className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Address</h3>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddressEdit}
            >
              {isAddressEditable ? "Save" : "Edit"}
            </button>
          </div>
          <hr />
          <div className="row g-4">
            <div className="col-md">
              <span className="fw-semibold">Country</span>
              <select
                className="form-select border-0 bg-transparent"
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!isAddressEditable}
              >
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            {/* <div className="col-md">
              <span className="fw-semibold">City</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={City}
                onChange={(e) => setCity(e.target.value)}
                disabled={!isAddressEditable}
              />
            </div> */}
            <div className="col-md">
              <span className="fw-semibold">Postal Code</span>
              <input
                className="form-control border-0 bg-transparent"
                type="text"
                value={PostalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!isAddressEditable}
              />
            </div>
          </div>
        </div>
        <div id="create">
          <Link to="/tournament" style={{ textDecoration: "none" }}>
            <button
              type="button"
              id="create_tournment"
              className="btn btn-success"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
                >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Create Tournament
            </button>
          </Link>
          <Link to="/viewmatch" style={{ textDecoration: "none" }}>
            {" "}
            <button type="button" id="create_match" className="btn btn-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
                >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Create Match
            </button>
          </Link>
        </div>
        <div className="d-flex" style={{alignItems:'center',justifyContent:"center",gap:'5rem'}}>
        <div id="view_tournment">
          <span>
            <Link to="/tournament">View All Tournaments</Link>
          </span>
        </div>
        <div id="view_matche">
          <span>
            <Link  to="/viewmatch">View All Matches</Link>
          </span>
        </div>
        </div>
      </fieldset>
    </div>
        )}




      </div>
    </>
  );
};
