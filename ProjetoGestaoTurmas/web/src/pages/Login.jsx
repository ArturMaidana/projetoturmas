// Importações de bibliotecas e componentes do Material-UI e React
import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import '../Style/teste.css' // Importe um arquivo CSS para estilização
import logo from '../Style/logo.jpeg'

// Importações de componentes personalizados
import { Modal } from "../components/Modal";
import { loginUser } from "../services/user-services";

// Definição do componente 'Login'
export function Login() {
  // Configuração do formulário usando 'react-hook-form'
  const { handleSubmit, register, formState: { errors } } = useForm();
  
  // Estado para armazenar o resultado do login
  const [result, setResult] = useState(null);
  
  // Navegação
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de login
  const onSubmit = async (data) => {
    try {
      // Chama a função 'loginUser' para fazer o login do usuário
      const user = await loginUser(data);
      
      // Define o resultado do login e navega para a página inicial
      setResult(user);
      navigate('/home');
    } catch (error) {
      // Em caso de erro, define o resultado com a mensagem de erro
      setResult({
        title: 'Houve um erro no login!',
        message: error.response.data.error,
      });
    }
  }

  // Renderização do componente
  return (
    <div className="teste">
      <div>
        <img
          src={logo}
          alt="Imagem de boas-vindas"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      </div>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem', // Ajuste o preenchimento vertical e horizontal
            marginTop: '-14rem', // Ajuste a margem superior
            marginLeft: '3rem', // Mova o container mais para a direita
            marginRight: 'auto', 
          }}
        >
          {/* Modal para exibir mensagens */}
          <Modal
            show={result}
            title={result?.title}
            message={result?.message}
            handleClose={() => setResult(null)} // Lida com o fechamento do modal de resultado.
          />
          <Paper elevation={3} sx={{ width: '30rem', height: '26rem', backgroundColor: 'white', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography variant="h5" component="div" sx={{ fontSize: '30px' }}>Gestão de Turmas</Typography>
            <Typography variant="h6" sx={{ fontSize: '20px' }}>Login</Typography> 
            {/* Formulário de login */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate> 
              <TextField
                fullWidth
                label="E-mail" // Rótulo do campo de entrada de e-mail
                variant="standard" // Estilo do campo de entrada
                type="email" // Tipo de entrada de e-mail
                {...register('email', { // Configuração do react-hook-form para o campo de e-mail
                  required: 'E-mail é obrigatório', // Mensagem de erro se o campo estiver vazio
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, // Expressão regular para validar o formato do e-mail
                    message: 'E-mail inválido!', // Mensagem de erro se o formato for inválido
                  },
                })}
                error={!!errors.email} // Define um erro se houver erro no campo de e-mail
                helperText={errors.email?.message} // Exibe a mensagem de erro abaixo do campo de e-mail
                sx={{ height: '60px', mb: 2, mt: -1 }} // Estilo personalizado para o campo de e-mail
              />
              <TextField
                fullWidth
                label="Senha" // Rótulo do campo de entrada de senha
                variant="standard" // Estilo do campo de entrada
                type="password" // Tipo de entrada de senha
                {...register('password', { // Configuração do react-hook-form para o campo de senha
                  required: 'Senha é obrigatória', // Mensagem de erro se o campo estiver vazio
                })}
                error={!!errors.password} // Define um erro se houver erro no campo de senha
                helperText={errors.password?.message} // Exibe a mensagem de erro abaixo do campo de senha
                sx={{ height: '60px' }} // Estilo personalizado para o campo de senha
              />
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: 'black', color: 'white', height: '50px', mt: 2 }}>Entrar</Button> 
              <Typography variant="body2" sx={{ fontSize: '14px', mt: 1, textAlign: 'center' }}>
                Não tem conta? <Link to="/register">Cadastre-se</Link> 
              </Typography>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
