<?php

class WebxsparkAPP
{
    private function randUniqueId()
    {
        return bin2hex(random_bytes(5));
    }
    public static $BASE_URL = "https://lnk.webxspark.com/";
    public function newURLInsert($conn, $url)
    {
        //validate url
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return [
                "error" => "Please provide a valid URL!"
            ];
        }

        //sanitize url
        $url = htmlspecialchars($url);

        //required data
        $URL_ID = $this->randUniqueId();
        $clicks = 0;

        //inserting data into database
        $stmt = $conn->prepare("INSERT INTO url(shorten_url, full_url, clicks) VALUES(?,?,?)");
        $stmt->bind_param('sss', $URL_ID, $url, $clicks);
        if ($stmt->execute()) {
            return [
                "status" => 200,
                "url_id" => $URL_ID,
                "short_url" => $this::$BASE_URL . $URL_ID,
            ];
        }
        return [
            "error" => "Something went wrong. Please try again later!"
        ];
    }
    public function updateClicks($conn, $URL_ID)
    {
        $stmt = $conn->prepare("UPDATE url SET clicks=clicks+1 WHERE shorten_url=? LIMIT 1");
        $stmt->bind_param("s", $URL_ID);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function redirectURL($conn, $URL_ID)
    {
        $stmt = $conn->prepare("SELECT * FROM url WHERE shorten_url=? LIMIT 1");
        $stmt->bind_param('s', $URL_ID);
        $result = ($stmt->execute())->get_result();
        $count = $result->num_rows;
        if ($count > 0) {
            //updating url click count
            $this->updateClicks($conn, $URL_ID);
            $urlInfo = mysqli_fetch_assoc($result);
            return [
                "status" => 200,
                "url" => $urlInfo['full_url']
            ];
        }
        return false;
    }
}
