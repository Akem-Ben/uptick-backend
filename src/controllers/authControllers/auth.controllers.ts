import { Request, Response } from "express";
import { authServices } from "../../services";
import { errorUtilities } from "../../utilities";
import { responseUtilities } from "../../utilities";



const userRestrationController = errorUtilities.withControllerErrorHandling(async (request: Request, response: Response) => {
    const payloadDetails = request.body;
    const registerUser = await authServices.registerUserService(payloadDetails)
    return responseUtilities.responseHandler(
        response,
        registerUser.message,
        registerUser.statusCode,
        registerUser.data
    )
})




export default {
    userRestrationController
}