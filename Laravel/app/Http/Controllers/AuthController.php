<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class AuthController extends Controller {
  protected $stopOnFirstFailure = true;
  // public function __construct(){
  //   $this->middleware("auth:api",["except" => ["login","register"]]);
  // }

  public function update_user(Request $request){
    // auth()->user()->tokens()->delete();
    // $user = Auth::guard("api")->user()->token();
    $validator;
    if ($request['type']=='email')
      $validator = Validator::make($request->all(), [
        'value' =>'email|required|min:4|string|max:255',
        'type'=>'required|string|max:255'
      ]);
    else
      $validator = Validator::make($request->all(), [
        'value' =>'regex:/^[a-z]+[0-9- ]*[a-z]*$/i|required|min:4|string|max:255',
        'type'=>'required|string|max:255'
      ]);
    


    // if ($request['type']=='email' && $validator->fails())
    //   return response()->json(['errors'=>$validator->errors(),'success'=>false]);
    if($validator->fails()){
      $validator->errors()->add('regex', 'username must start with a letter');
      return response()->json(['errors'=>$validator->errors(),'success'=>false]);
    }
    // $request->validate([
    //   'value' =>'bail|required|min:4|string|max:255',
    //   'type'=>'bail|required|string|max:255'
    // ]);
    $user = Auth::user();
    
    $user[$request['type']] = $request['value'];
    $user->save();

    $user = Auth::user()->only(['name','email']);
    // $user = array("username"=>auth()->user()->name,"email"=>auth()->user()->email);

    return response()->json([
      'success' => true,
      'user' => $user
    ]);
  }

  public function register(Request $request){
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email',
      'password' => 'required|string|min:3',
    ]);
    
    error_log ($request->password);
    if ($validator->fails()) 
      return response()->json(['errors'=>$validator->errors(),'success'=>false]);

    $user = User::create([
      'name' => implode($validator->safe()->only(['name'])),
      'email' => implode($validator->safe()->only(['email'])),
      'password' => Hash::make(implode($validator->safe()->only(['password'])))
    ]);

    // $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        // 'access_token' => $token,
        'token_type' => 'Bearer',
        'success' => true
    ]);
  }

  public function login(Request $request){

    if (!Auth::attempt($request->only('email', 'password'))) {
      return response()->json([
        "success" => false,
        'message' => 'Invalid login details',
        "errors" => ['Invalid login details']
      ], 422);
    }
    
    $user = User::where('email', $request['email'])->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;
    $responseMessage = "Login Successful";
    $user = auth()->user()->only(['name','email']);
    // $user = array("username"=>auth()->user()->name,"email"=>auth()->user()->email);
    return $this->respondWithToken($token, $responseMessage, $user);

  }

  public function logout(Request $request){
    auth()->user()->tokens()->delete();
    $responseMessage = "successfully logged out";
    return response()->json([
      'success' =>  true,
      'message' => $responseMessage
    ], 200);
  }
  
}
