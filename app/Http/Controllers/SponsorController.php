<?php

namespace App\Http\Controllers;

use App\Sponsor;
use Illuminate\Http\Request;

use App\Http\Requests;

class SponsorController extends Controller
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
        $sponsors = Sponsor::all();
        return response()->json($sponsors);
    }
}
