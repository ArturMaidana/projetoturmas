// Importações de bibliotecas e componentes React
import { FaChartBar, FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Style/Home.css'; // Importe um arquivo CSS para estilização
import { SideBar } from '../components/Sidebar/Sidebar';

// Definição do componente 'Home'
export function Home() {
  return (
    <div>
      <SideBar/>
      <div className="container-margin">
        <div className="main-content">
          <h3>Seja Bem-vindo Administrador</h3>
          <p>Bem-vindo à nossa plataforma de Sistema de Gestão de Turmas! Se você é um educador, administrador de escola, ou simplesmente alguém interessado em otimizar a organização e acompanhamento de turmas, você está no lugar certo. 
            Nossa plataforma foi cuidadosamente projetada para simplificar e aprimorar a gestão de turmas em todos os níveis de ensino, desde escolas primárias até instituições de ensino superior. Com as ferramentas e recursos que oferecemos, você poderá acompanhar o progresso dos alunos, atribuir tarefas, gerenciar calendários, e muito mais, tudo em um único lugar intuitivo e eficiente. 
            Vamos explorar como nosso Sistema de Gestão de Turmas pode revolucionar a maneira como você gerencia o processo educacional. 
            Junte-se a nós nesta jornada rumo a uma gestão mais eficaz, colaborativa e centrada no aluno.
          </p>
          <hr /> {/* Adiciona uma linha horizontal */}
          <h2>Painel de Serviços</h2>
          <div className="icon-blocks">
            {/* Links para diferentes páginas da aplicação */}
            <Link to="/dashboard" className="icon-block" style={{color: 'inherit', textDecoration: 'none'}}>
              <FaChartBar size={64} />
              <p>Dashboard</p>
            </Link>
            <Link to="/turmas" className="icon-block" style={{color: 'inherit', textDecoration: 'none'}}>
              <FaChalkboardTeacher size={64} />
              <p>Turmas</p>
            </Link>
            <Link to="/alunos" className="icon-block" style={{color: 'inherit', textDecoration: 'none'}}>
              <FaUserGraduate size={64} />
              <p>Alunos</p>
            </Link>
            <Link to="/usuarios" className="icon-block" style={{color: 'inherit', textDecoration: 'none'}}>
              <FaUsers size={64} />
              <p>Usuários</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
