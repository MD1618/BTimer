<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans|Overpass|Righteous&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href='{{asset('/css/bootstrap.min.css')}}'>
    <link rel="stylesheet" href='{{asset('/css/site.css')}}'>
    <script src="{{asset('/js/jquery.min.js')}}"></script>
    <script src="{{asset('/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('/js/site.js')}}"></script>
    <title>Breathing Tracker</title>
    <style>

    </style>
</head>


<body>

    <div class="navHeader">
        {{-- <div class="brand">
            Breathing Timer
        </div>
        <div class="login">
            Login
        </div> --}}
        <nav style="padding:0;" class="navbar navbar-expand-lg navbar-dark">
            <a class="brand" href="#">B-Timer</a>
            <button style="border:none;padding:0;" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span style="width:30px;margin-top:4px;" class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav" >
                <ul class="navbar-nav" style="">
                    {{-- <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li> --}}
                    <li class="nav-item " style="">
                        <a class="nav-link" href="#">Log In</a>
                    </li>
                    {{-- <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li> --}}
                    {{-- <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li> --}}
                </ul>
            </div>
        </nav>
    </div>
    <div>

        @yield('content')
    </div>

</body>

</html>