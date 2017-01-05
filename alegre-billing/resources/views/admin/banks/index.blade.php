@extends('layouts.admin')
@section('content')
<div class="container">
    <div class="row">
        <h4>Listagem de bancos</h4>
        <a href="{{route("admin.banks.create")}}" class="btn waves-effect">Novo banco</a>
        <table class="bordered striped highlight centered responsive-table z-depth-5">
            <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            @foreach($banks as $bank)
                <tr>
                    <td>
                        <div class="row valign-wrapper">
                          <div class="col s12"> {{ $bank->id }}</div>
                        </div>
                    </td>
                    <td>
                        <div class="row valign-wrapper">
                            <div class="col s2"> <img src="{{asset("storage/banks/images/{$bank->logo}")}}" class="bank-logo"/></div>
                            <div class="col s10"> <span class="left">{{ $bank->name}} </span></div>
                        </div>

                    </td>
                    <td>
                        <div class="row valign-wrapper">
                            <div class="col s12">
                                <a href="{{route('admin.banks.edit',['bank'=>$bank->id])}}">Editar</a> |
                                <delete-action action="{{route('admin.banks.destroy',['bank'=>$bank->id])}}" action-element="link-delete-{{$bank->id}}" csrf-token="{{csrf_token()}}">
                                    <?php $modalId = "modal-delete-$bank->id";?>
                                    <a id="link-modal-{{$bank->id}}"
                                       href="#{{$modalId}}">Excluir</a>
                                    <modal :modal="{{json_encode(["id" => $modalId])}}" style="display: none;">
                                        <div slot="content">
                                            <h5>Mensagem de confirmação</h5>
                                            <p><strong>Deseja excluir esse banco?</strong></p>
                                            <div class="divider"></div>
                                            <p>Nome: <strong>{{$bank->name}}</strong></p>
                                            <div class="divider"></div>
                                            <div slot="footer">
                                                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
                                                <button  id="link-delete-{{$bank->id}}" class="btn btn-flat waves-effect green lighten-2 modal-close modal-action">OK</button>

                                            </div>
                                        </div>
                                    </modal>
                                </delete-action>
                            </div>
                        </div>

                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $banks->links() !!}
    </div>

</div>
    @endsection