import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Turmas } from "./pages/Turmas";
import { Alunos } from "./pages/Alunos";
import { Disciplinas } from "./pages/Disciplinas";
import { Dashboard } from "./pages/Dashboard";


import { isAuthenticated } from './utils/is-authenticated';
import { Home } from "./pages/Home";
import { FormularioTurma } from "./components/Formularios/FormularioTurmas";
import { FormularioDisciplina } from "./components/Formularios/FormulárioDisciplina";
import { FormularioAluno } from "./components/Formularios/FormularioAlunos";



/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        // Pode trocar para renderizar uma página customizada de não autorizada,
        // nesse caso ele vai voltar para a tela de login
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={

                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>} />

                <Route path="/turmas" element={(
                <PrivateRoute>
                    <Turmas />
                </PrivateRoute>)} />

                <Route path="/turmas/formulario" element={(
                <PrivateRoute>
                    <FormularioTurma />
                </PrivateRoute>)} />
                
                <Route path="/home" element={(
                <PrivateRoute>
                        <Home />
                </PrivateRoute>)} />

                <Route path="/alunos" element={(
                    <PrivateRoute>
                            <Alunos />
                    </PrivateRoute>
                )} />
                
                 <Route path="/alunos/formulario" element={(
                    <PrivateRoute>
                            <FormularioAluno />
                    </PrivateRoute>
                )} />

                <Route path="/disciplinas" element={(
                    <PrivateRoute>
                            <Disciplinas />
                    </PrivateRoute>
                )} />

                 <Route path="/disciplinas/formulario" element={(
                    <PrivateRoute>
                            <FormularioDisciplina />
                    </PrivateRoute>
                )} />
                
            </Routes>
        </BrowserRouter>
    )
}
