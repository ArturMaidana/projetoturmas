import { Container, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { SideBar } from '../Sidebar/Sidebar';
import { Header } from "../Header";
import { Input } from '../Input';
import '../../Style/Home.css'; // Importe um arquivo CSS para estilização

import { createAlunos, getTurmas } from "../../services/alunos-service";

export function FormularioAluno() {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [alertMessage, setAlertMessage] = useState(null);
    const [turmas, setTurmas] = useState([]);
    const navigate = useNavigate();

    // Função para exibir um alerta de sucesso ou erro
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Função para buscar a lista de turmas quando o componente é montado
    // eslint-disable-next-line
    useEffect(() => {
        fetchTurmas();
         // eslint-disable-next-line
    }, []);

    // Função para buscar a lista de turmas
    async function fetchTurmas() {
        try {
            const result = await getTurmas();
            setTurmas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    // Função para adicionar um aluno
    async function addAluno(data) {
        try {
            await createAlunos(data);
            reset(); // Limpa o formulário após a submissão
            showAlert('Aluno Matriculado com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao matricular o aluno', 'error'); // Exibe o alerta de erro
        }
    }

    return (
        <div className='container-margin'>
            <SideBar />
            {alertMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                </Stack>
            )}
            <Container fluid>
                <Header title="Formulário de Aluno" />
                <Col className="w-50 m-auto mt-4">
                    <Form noValidate onSubmit={handleSubmit(addAluno)} validated={!!errors}>
                        {/* Campo de Nome do Aluno */}
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do Aluno'
                            placeholder='Insira o nome do aluno'
                            required={true}
                            name='nomealunos'
                            error={errors.nomealunos}
                            validations={register('nomealunos', {
                                required: {
                                    value: true,
                                    message: 'Nome do aluno é obrigatório.'
                                }
                            })}
                        />
                        {/* Campo de Telefone */}
                        <Input
                            className="mb-3"
                            type='text'
                            label='Telefone'
                            placeholder='Insira o número de telefone'
                            required={true}
                            name='telefone'
                            error={errors.telefone}
                            validations={register('telefone', {
                                required: {
                                    value: true,
                                    message: 'Número de telefone é obrigatório.'
                                }
                            })}
                        />
                        {/* Campo de Data de Ingresso */}
                        <Input
                            className="mb-3"
                            type='date'
                            label='Data de Ingresso'
                            required={true}
                            name='dataIngressante'
                            error={errors.dataIngressante}
                            validations={register('dataIngressante', {
                                required: {
                                    value: true,
                                    message: 'Data de ingresso é obrigatória.'
                                }
                            })}
                        />
                        {/* Campo de Seleção de Turma */}
                        <Form.Group>
                            <Form.Label>Seleciona a Turma</Form.Label>
                            <Form.Select {...register('turma')}>
                                <option disabled>Clique para selecionar</option>
                                {turmas.map((turma) => (
                                    <option key={turma.nometurmas} value={turma.nometurmas}>
                                        {turma.nometurmas} {/* Replace with your Turma property */}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {/* Campo de Seleção de Turno */}
                        <Form.Group>
                            <Form.Label>Selecione o Turno</Form.Label>
                            <Form.Select {...register('turno')}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Matutino'}>Matutino</option>
                                <option value={'Vespertino'}>Vespertino</option>
                                <option value={'Noturno'}>Noturno</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Botões de Confirmação e Cancelamento */}
                        <Grid container justifyContent="flex-end">
                            <Button className="mt-3 mb-3" variant='contained' color='success' type="submit">
                                Confirmar Cadastro
                            </Button>
                            <Grid item xs={0.30}></Grid>
                            <Button className="mt-3 mb-3" variant="contained" color='error' onClick={() => navigate('/alunos')}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
