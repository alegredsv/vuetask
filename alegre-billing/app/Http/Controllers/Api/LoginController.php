<?php

namespace AlegreBill\Http\Controllers\Api;

use AlegreBill\Http\Controllers\Controller;
use AlegreBill\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
     use AuthenticatesUsers;

    public function accessToken(Request $request){
        $this->validateLogin($request);
        $credentials =  $this->credentials($request);
        if($token = Auth::guard('api')->attenpt($credentials)){
            //retorna token
            return $this->sendLoginResponse($request, $token);
        }
    }

    protected function sendLoginResponse(Request $request, $token)
    {

    }


    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->flush();

        $request->session()->regenerate();

        return redirect(env('URL_ADMIN_LOGIN'));
    }

}
