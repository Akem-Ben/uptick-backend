import { Request, Response } from "express";
import { authServices } from "../../services";
import { errorUtilities } from "../../utilities";
import { responseUtilities } from "../../utilities";
import { GeneralResponses } from "../../responses/generalResponses/general.responses";
import { StatusCodes } from "../../responses/statusCodes/statusCodes.responses";



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


const veryUserAccountController = errorUtilities.withControllerErrorHandling(async(request: Request, response: Response) => {
    const { token } = request.params;
    if(!token){
        throw errorUtilities.createError(GeneralResponses.VERIFICATION_ERROR, StatusCodes.BadRequest);
    }
    const verifiedUser = await authServices.verifyUserAccountService(token)
    return responseUtilities.responseHandler(
        response,
        verifiedUser.message,
        verifiedUser.statusCode,
        verifiedUser.data
    )
})

export default {
    userRestrationController,
    veryUserAccountController
}