@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card-dark" style="color:white;">
                <div class="card-header">Breathing Sessions
                    <a class="" style="color:white;position:absolute;right:30px;text-decoration: underline;" href="{{ url('/') }}">
                        Back to Timer
                    </a>
                </div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    
                </div>
                <table class="dashboardTable">
                    <thead style="border-bottom:2px solid #333;">
                        <tr>
                            <th style="text-align: center">Date</th>
                            <th style="text-align: center">Duration</th>
                            <th style="text-align: center">Longest Hold</th>
                            <th style="text-align: center">Average Hold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- @if(count($hof_sessions) > 1) --}}
                        @foreach($hof_sessions as $hof_session)
                        <tr>
                            
                            <?php 
                                $seshH = ($hof_session->session_hour < 10)? "0".$hof_session->session_hour : $hof_session->session_hour;
                                $seshM = ($hof_session->session_min < 10)? "0".$hof_session->session_min : $hof_session->session_min;
                                $seshS = ($hof_session->session_sec < 10)? "0".$hof_session->session_sec : $hof_session->session_sec;
                                $seshholdM = ($hof_session->hold_min < 10)? "0".$hof_session->hold_min : $hof_session->hold_min;
                                $seshholdS = ($hof_session->hold_sec < 10)? "0".$hof_session->hold_sec : $hof_session->hold_sec;
                                $seshAVM = ($hof_session->AVhold_min < 10)? "0".$hof_session->AVhold_min : $hof_session->AVhold_min;
                                $seshAVS = ($hof_session->AVhold_sec < 10)? "0".$hof_session->AVhold_sec : $hof_session->AVhold_sec;
                            ?>
                            <td style="text-align: center">{{ $hof_session->created_at }}</td>
                            <td style="text-align: center">{{ $seshH }}:{{ $seshM }}:{{ $seshS }}</td>
                            <td style="text-align: center">{{ $seshholdM }}:{{ $seshholdS }}</td>
                            <td style="text-align: center">{{ $seshAVM }}:{{ $seshAVS }}</td>
                            <td class="deleteIcon" onclick="deleteSession({{ $hof_session->id }});"></td>
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