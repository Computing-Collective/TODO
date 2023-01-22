import axios from "axios";
export default function refreshPage() {
  axios.get('/api/new-assignments')
  .then(
    function (response) {
      
    }
  )
}
