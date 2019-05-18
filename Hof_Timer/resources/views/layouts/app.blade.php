<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans|Righteous|Roboto+Condensed&display=swap" rel="stylesheet"> 
    
    <title>Breathing Tracker</title>


    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    
    
    <script src="{{asset('/js/jquery.js')}}" defer></script>
    <script src="{{asset('/js/bootstrap.js')}}" defer></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{asset('/js/site.js')}}" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href='{{asset('/css/bootstrap.css')}}'>
    <link rel="stylesheet" href='{{asset('/css/site.css')}}'>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark   shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    B-Timer
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                 

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item " onclick="toggleLogOut();">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" >
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div id="logOutButton" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a href="/home">DashBoard</a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
