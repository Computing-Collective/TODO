import axios from "axios";
export default function refreshPage() {
  axios({
    method: "GET",
    url:"http://localhost:5000/getall",
  })
  .then(
    function (response) {
      console.log(response);
    }
  )
}
