import axios from "axios";

module.exports.URL = `${process.env.BACK_URL}/api/job-specification`
module.exports.getJobSpec = async (roleId: number) => (await axios.get(`${process.env.BACK_URL}/api/job-specification/${roleId}`)).data;