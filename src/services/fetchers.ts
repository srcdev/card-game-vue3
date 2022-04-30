import HttpClient from "@/composibles/useHttpClient";

class DataServices {
  async fetchPersonalDetails() {
    const apiResponse = await import("@/mocks/data/personalDetails.json");
    //const apiResponse: any = await httpClient.get("fetchPersonalDetails");
    const response: any = apiResponse;
    return response.data.payload;
  }

  async fetchUserProfile(userId: any) {
    const apiResponse = await import("@/mocks/data/personalDetails.json");
    // const apiResponse: any = await httpClient.post("fetchUserProfile", userId);
    const response: any = apiResponse;
    return response.data.payload;
  }

  async loginUser(payload: any) {
    const apiResponse = await import("@/mocks/data/loginPayload.json");
    // const apiResponse: any = await httpClient.post("fetchUserProfile", payload);
    const response: any = apiResponse;
    return response.data.payload;
  }
}

export default new DataServices();
