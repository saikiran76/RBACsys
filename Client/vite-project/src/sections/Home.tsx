import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { userApi, roleApi } from '../utils/api';
import { User, Role } from '../types';
import { useTheme } from '../context/ThemeContext';
const Home = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalRoles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, roles] = await Promise.all([
          userApi.getUsers(),
          roleApi.getRoles(),
        ]);

        const adminRoles = roles.filter((role: Role) => 
          role.name !== 'Public'
        );

        const admins = users.filter((user: User) =>
          adminRoles.some((role: Role) => role.id === user.roleId)
        );

        setStats({
          totalUsers: users.length,
          totalAdmins: admins.length,
          totalRoles: roles.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className={`backdrop-blur-md p-4 w-[20rem] md:min-w-full rounded-lg mt-20 md:mt-8 ${
      isDarkMode ? 'bg-gray-800 border-white/15' : 'bg-white/15 border-gray-600'
    }`}>
      <h2 className={`${isDarkMode ? 'text-white/80' : 'text-gray-700'} text-md md:text-xl font-sans px-5 py-4`}>
        Hey admin, Welcome back.
      </h2>
      <div className='grid grid-rows-3 md:grid-cols-3 gap-4 px-4 py-3'>
        <Card className={`${isDarkMode ? 'bg-[#022213]' : 'bg-[#022213] bg-opacity-80 border-transparent'} hover:bg-gradient-r hover:from-[#022213] hover:to-lime-500 bg-opacity-80 hover:scale-105 transition-all duration-300 shadow-sm hover:shadown-md max-w-[15rem] md:max-w-full `} title='Total Users'>
          <h2 className={`${isDarkMode ? 'text-white/80' : 'text-gray-200'} text-xl font-semibold`}>
            {loading ? '...' : stats.totalUsers}
          </h2>
        </Card>
        <Card className={`${isDarkMode ? 'bg-[#022213]' : 'bg-gray-900'} hover:bg-gradient-r hover:from-[#022213] hover:to-lime-500 bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-sm hover:shadown-md max-w-[15rem] md:max-w-full`} title='Total Admins'>
          <h2 className={`${isDarkMode ? 'text-white/80' : 'text-gray-400'} text-xl font-semibold`}>
            {loading ? '...' : stats.totalAdmins}
          </h2>
        </Card>
        <Card className={`${isDarkMode ? 'bg-[#022213]' : 'bg-lime-900'} hover:bg-gradient-r hover:from-[#022213] hover:to-lime-500 bg-opacity-70 hover:scale-105 transition-all duration-300 shadow-sm hover:shadown-md max-w-[15rem] md:max-w-full`} title='Total Roles'>
          <h2 className={`${isDarkMode ? 'text-white/80' : 'text-gray-200'} text-xl font-semibold`}>
            {loading ? '...' : stats.totalRoles}
          </h2>
        </Card>
      </div>
    </section>
  );
};

export default Home;
