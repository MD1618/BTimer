@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard
                    <a class="" style="position:absolute;right:30px;" href="{{ url('/') }}">
                        Back to Timer
                    </a>
                </div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    Breathing Sessions
                </div>
                <table class="dashboardTable">
                    <thead>
                        <tr>
                            <th>Session Date</th>
                            <th>Session Duration</th>
                            <th>Longest Hold</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12/05/2019 15:35:12</td>
                            <td>45mins 12seconds</td>
                            <td>2mins 23seconds</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection