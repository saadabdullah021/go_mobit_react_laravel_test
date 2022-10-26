<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function AddUser(Request $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'cell' => $request->cell,
            'age' => $request->age,

        ]);

        return response()->json([
            'data' => $user, "status" => 200
        ]);
    }

    public function GetUsers($id = null)
    {
        if ($id == 0) {
            $all_users = User::all();

            return response()->json(['data' => $all_users, "status" => 200]);
        } else {
            $user = User::find($id);

            return response()->json(['data' => $user, "status" => 200]);
        }
    }
}
