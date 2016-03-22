<?php

namespace App\Http\Controllers;

use App\Tecnology;
use Illuminate\Http\Request;

use App\Http\Requests;

class TechnologyController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Get al available technologies
     */
    public function index()
    {
        $technologies = Tecnology::all();
        return response()->json($technologies);
    }
}
