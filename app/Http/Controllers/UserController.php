<?php

namespace App\Http\Controllers;

use App\Student;
use App\User;
use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {

    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        $user = new User();
        $user->save();
        $student = new Student();
        $student->user()->associate($user);
        $user->name = $request->studentFirstName . ' ' . $request->studentLasttName;
        $user->email = $request->studentEmail;
        $user->password = bcrypt($request->studentPassword);
        $user->isAStudent = 1;

        $student->firstname = $request->studentFirstName;
        $student->lastname = $request->studentLastName;
        $student->school = $request->studentSchool;
        $student->study = $request->studentStudy;
        $student->year = $request->studentYear;
        $student->intrest = $request->studentIntrest;
        $student->isActive = $request->studentActive;

        $user->update();
        $student->save();

        DB::commit();

        return response()->json($student->firstname . ' ' . $student->lastname);
    }
}
