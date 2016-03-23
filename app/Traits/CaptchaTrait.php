<?php namespace App\Traits;

use Illuminate\Support\Facades\Input;
use ReCaptcha\ReCaptcha;

trait CaptchaTrait
{

    /**
     * Check google captcha. Returns true if verify was oK, false otherwise.
     * @param $captchaResponse
     * @return bool
     */
    public function captchaCheck($captchaResponse)
    {
        $response = $captchaResponse;
        $remoteip = $_SERVER['REMOTE_ADDR'];
        $secret = env('RE_CAP_SECRET');

        $recaptcha = new ReCaptcha($secret);
        $resp = $recaptcha->verify($response, $remoteip);
        if ($resp->isSuccess()) {
            return true;
        } else {
            return false;
        }
    }
}