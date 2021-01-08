import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { FiSearch } from 'react-icons/fi';
import { AvatarGenerator } from 'random-avatar-generator';

import api from '../../services/api';

import Select from '../../components/Select';

import logo from '../../assets/logo.svg';
import find_job from '../../assets/find-job.svg';

import {
  Container,
  Header,
  HeaderContent,
  TopContainer,
  TopContent,
  TopContentMessage,
  Filter,
  Content,
  DevsList,
  Dev,
} from './styles';

interface ITechnology {
  name: string;
  is_main_tech: boolean;
}

interface IDev {
  id: number;
  city: string;
  experience: string;
  technologies: ITechnology[];
}

interface IFormattedDev {
  id: number;
  city: string;
  experience: string;
  technologies: Array<string>;
}

const Dashboard: React.FC = () => {
  const generator = new AvatarGenerator();

  const filterRef = useRef(null);

  const [devs, setDevs] = useState<IDev[]>([]);

  const loadDevs = useCallback(async () => {
    try {
      const response = await api.get('/candidates');

      setDevs(response.data);

      const formattedDevs = response.data.map((dev: IDev) => ({
        ...dev,
        technologies: dev.technologies
          .map(tecnology => {
            return tecnology.name;
          })
          .join(', '),
      }));

      console.log(formattedDevs);
    } catch {
      console.log('Falha ao carregar devs');
    }
  }, []);

  useEffect(() => {
    loadDevs();
  }, [loadDevs]);

  const experienceOptions = useMemo(() => {
    return [
      { value: '0-1 years', label: '0-1 anos' },
      { value: '1-2 years', label: '1-2 anos' },
      { value: '2-3 years', label: '2-3 anos' },
      { value: '3-4 years', label: '3-4 anos' },
      { value: '4-5 years', label: '4-5 anos' },
      { value: '5-6 years', label: '5-6 anos' },
      { value: '6-7 years', label: '6-7 anos' },
      { value: '7-8 years', label: '7-8 anos' },
      { value: '8-9 years', label: '8-9 anos' },
      { value: '9-10 years', label: '9-10 anos' },
      { value: '10-11 years', label: '10-11 anos' },
      { value: '11-12 years', label: '11-12 anos' },
      { value: '12+ years', label: '12+ anos' },
    ];
  }, []);

  const locationOptions = useMemo(() => {
    return [];
  }, []);

  const techsOptions = useMemo(() => {
    return [
      { value: '.NET', label: '.NET' },
      { value: '.NET Core', label: '.NET Core' },
      { value: 'Actionscript', label: 'Actionscript' },
      { value: 'AdonisJS', label: 'AdonisJS' },
      { value: 'Ajax', label: 'Ajax' },
      { value: 'Angular 2', label: 'Angular 2' },
      { value: 'Angular 7', label: 'Angular 7' },
      { value: 'Angular 8', label: 'Angular 8' },
      { value: 'Angular 9', label: 'Angular 9' },
      { value: 'Angular 10', label: 'Angular 10' },
      { value: 'AngularJS', label: 'AngularJS' },
      { value: 'Apache', label: 'Apache' },
      { value: 'ASP.NET Core', label: 'ASP.NET Core' },
      { value: 'Arquitetura de software', label: 'Arquitetura de software' },
      { value: 'Arquitetura SOA', label: 'Arquitetura SOA' },
      { value: 'AWS', label: 'AWS' },
      {
        value: 'AWS EC2 (Elastic Compute Cloud)',
        label: 'AWS EC2 (Elastic Compute Cloud)',
      },
      {
        value: 'AWS SQS (Simple Queue Service)',
        label: 'AWS SQS (Simple Queue Service)',
      },
      { value: 'AWS Redshift', label: 'AWS Redshift' },
      {
        value: 'AWS RDS (Relational Database Service)',
        label: 'AWS RDS (Relational Database Service)',
      },
      { value: 'Azure', label: 'Azure' },
      { value: 'Bash', label: 'Bash' },
      { value: 'BigData', label: 'BigData' },
      { value: 'Blockchain', label: 'Blockchain' },
      { value: 'Bootstrap', label: 'Bootstrap' },
      { value: 'C', label: 'C' },
      { value: 'C#', label: 'C#' },
      { value: 'C++', label: 'C++' },
      { value: 'CakePHP', label: 'CakePHP' },
      { value: 'Clipper', label: 'Clipper' },
      { value: 'COBOL', label: 'COBOL' },
      {
        value: 'Continuous Integration/Deployment(CI/CD)',
        label: 'Continuous Integration/Deployment(CI/CD)',
      },
      { value: 'CSS3', label: 'CSS3' },
      { value: 'Cultura Ágil', label: 'Cultura Ágil' },
      { value: 'Data Mining', label: 'Data Mining' },
      { value: 'Data science', label: 'Data science' },
      { value: 'Delphi', label: 'Delphi' },
      { value: 'Design Thinking', label: 'Design Thinking' },
      { value: 'Django', label: 'Django' },
      { value: 'Docker', label: 'Docker' },
      { value: 'Eclipse', label: 'Eclipse' },
      { value: 'EJB', label: 'EJB' },
      { value: 'Elasticsearch', label: 'Elasticsearch' },
      { value: 'Elixir', label: 'Elixir' },
      { value: 'ETL', label: 'ETL' },
      { value: 'ExpressJS', label: 'ExpressJS' },
      { value: 'Firebird', label: 'Firebird' },
      { value: 'Flask', label: 'Flask' },
      { value: 'Flutter', label: 'Flutter' },
      { value: ' Fortran', label: 'Fortran' },
      { value: 'Gestão', label: 'Gestão' },
      { value: 'Git', label: 'Git' },
      { value: 'Go', label: 'Go' },
      { value: 'Google Cloud', label: 'Google Cloud' },
      { value: 'Gulp', label: 'Gulp' },
      { value: 'Hibernate', label: 'Hibernate' },
      { value: 'Hadoop', label: 'Hadoop' },
      { value: 'Hive', label: 'Hive' },
      { value: 'HTML', label: 'HTML' },
      { value: 'HTML5', label: 'HTML5' },
      { value: 'Ionic', label: 'Ionic' },
      { value: 'Java', label: 'Java' },
      { value: 'Java (Android)', label: 'Java (Android)' },
      { value: 'JAVA EE ', label: 'JAVA EE' },
      { value: 'Javascript', label: 'Javascript' },
      { value: 'Jenkins ', label: 'Jenkins ' },
      { value: 'JIRA', label: 'JIRA' },
      { value: 'jQuery', label: 'jQuery' },
      { value: 'JPA', label: 'JPA' },
      { value: 'JSF', label: 'JSF' },
      { value: 'JSON', label: 'JSON' },
      { value: 'JUnit', label: 'JUnit' },
      { value: 'Kanban', label: 'Kanban' },
      { value: 'Keras', label: 'Keras' },
      { value: 'Kotlin', label: 'Kotlin' },
      { value: 'Laravel 5', label: 'Laravel 5' },
      { value: 'liquibase', label: 'liquibase' },
      { value: 'Linux', label: 'Linux' },
      { value: 'Machine learning', label: 'Machine learning' },
      { value: 'Maven', label: 'Maven' },
      { value: 'MATLAB', label: 'MATLAB' },
      { value: 'Meteor ', label: 'Meteor' },
      { value: 'MongoDB', label: 'MongoDB' },
      { value: 'MySQL', label: 'MySQL' },
      { value: 'Nginx', label: 'Nginx' },
      { value: 'Node.js', label: 'Node.js' },
      { value: 'Nosql', label: 'Nosql' },
      { value: 'NPM', label: 'NPM' },
      { value: 'Objective-C (iOS)', label: 'Objective-C (iOS)' },
      { value: 'ORACLE', label: 'ORACLE' },
      { value: 'PhoneGap', label: 'PhoneGap' },
      { value: 'PHP', label: 'PHP' },
      { value: 'PL/SQL', label: 'PL/SQL' },
      { value: 'PostgreSQL', label: 'PostgreSQL' },
      { value: 'Power BI', label: 'Power BI' },
      { value: 'Primefaces', label: 'Primefaces' },
      {
        value: ' Programação Orientada a Objeto',
        label: 'Programação Orientada a Objeto',
      },
      { value: 'Python', label: 'Python' },
      { value: 'QT', label: 'QT' },
      { value: 'R -  language', label: 'R -  language' },
      { value: 'React', label: 'React' },
      { value: 'React Native', label: 'React Native' },
      { value: 'Redis', label: 'Redis' },
      { value: 'Responsive\t Design', label: 'Responsive Design' },
      { value: 'RESTful', label: 'RESTful' },
      { value: 'Ruby', label: 'Ruby' },
      { value: 'Ruby on Rails', label: 'Ruby on Rails' },
      { value: 'Sass', label: 'Sass' },
      { value: 'Scala', label: 'Scala' },
      { value: 'SCRUM', label: 'SCRUM' },
      { value: 'SharePoint', label: 'SharePoint' },
      { value: 'Shell Script', label: 'Shell Script' },
      { value: 'SqLite', label: 'SqLite' },
      { value: 'SQL Server', label: 'SQL Server' },
      { value: 'Spark', label: 'Spark' },
      { value: 'Spring', label: 'Spring' },
      { value: 'Spring Boot', label: 'Spring Boot' },
      { value: 'Struts', label: 'Struts' },
      { value: 'SVN', label: 'SVN' },
      { value: 'Swift (iOS)', label: 'Swift (iOS)' },
      { value: 'Symfony 2', label: 'Symfony 2' },
      { value: 'TDD', label: 'TDD' },
      { value: 'TensorFlow', label: 'TensorFlow' },
      { value: 'Testes automatizados', label: 'Testes automatizados' },
      { value: 'Tomcat', label: 'Tomcat' },
      { value: 'Transact-SQL', label: 'Transact-SQL' },
      { value: 'Typescript', label: 'Typescript' },
      { value: 'UML', label: 'UML' },
      { value: 'Unity', label: 'Unity' },
      { value: 'Unity3D', label: 'Unity3D' },
      { value: 'Unreal Engine', label: 'Unreal Engine' },
      { value: 'VBA', label: 'VBA' },
      { value: 'Visual Basic', label: 'Visual Basic' },
      { value: 'Visual Basic .NET', label: 'Visual Basic .NET' },
      { value: 'Visual Fox Pro', label: 'Visual Fox Pro' },
      { value: 'Vue.js', label: 'Vue.js' },
      {
        value: 'WCF- Windows Communication Foundation',
        label: 'WCF- Windows Communication Foundation',
      },
      { value: 'Web Services', label: 'Web Services' },
      { value: 'WordPress', label: 'WordPress' },
      { value: 'Xamarin', label: 'Xamarin' },
      { value: 'Zend 2', label: 'Zend 2' },
    ];
  }, []);

  const handleFilter = useCallback(() => {
    console.log('filter');
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="devfinder" />
        </HeaderContent>
      </Header>
      <TopContainer>
        <TopContent>
          <img src={find_job} alt="find_job" />

          <TopContentMessage>
            <p>
              <strong>Encontre os </strong>
              melhores desenvolvedores para a sua empresa.
            </p>
            <span>
              Pesquise profissionais por experiência, localização ou
              tecnologias.
            </span>
          </TopContentMessage>
        </TopContent>
        <Filter ref={filterRef} onSubmit={handleFilter}>
          <Select
            name="experience"
            className="experience"
            label="Experiência"
            options={experienceOptions}
          />
          <Select
            name="location"
            className="location"
            label="Localização"
            options={[{ value: 1, label: 'Teste' }]}
          />
          <Select
            name="technologies"
            className="technologies"
            isMulti
            options={techsOptions}
          />
          <button type="submit">
            <FiSearch size={24} color="#6E2B77" />
          </button>
        </Filter>
      </TopContainer>
      <Content>
        <DevsList>
          <Dev>
            <img src={generator.generateRandomAvatar('avatar')} alt="avatar" />
            <span>
              <strong>Cidade: </strong>
              Rio de Janeiro - RJ
            </span>
            <span>
              <strong>Experiência: </strong>
              12+ anos
            </span>
          </Dev>
        </DevsList>
      </Content>
    </Container>
  );
};

export default Dashboard;
