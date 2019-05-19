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
                    <thead style="border-bottom:2px solid #333;">
                        <tr>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Longest Hold</th>
                            <th>Average Hold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- @if(count($hof_sessions) > 1) --}}
                            @foreach($hof_sessions as $hof_session)
                                <tr>
                                <td>{{ $hof_session->session_hour }}:{{ $hof_session->session_min }}:{{ $hof_session->session_sec }}</td>
                                <td>{{ $hof_session->hold_min }}:{{ $hof_session->hold_sec }}</td>
                                <td>{{ $hof_session->AVhold_min }}:{{ $hof_session->AVhold_sec }}</td>
                                <td>blank</td>
                                </tr>
                            @endforeach

                        {{-- @else
                            <p>No posts.</p>
                        @endif --}}

                       
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection