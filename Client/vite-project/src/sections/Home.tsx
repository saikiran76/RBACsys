import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { userApi, roleApi } from '../utils/api';
import { User, Role } from '../types';

const Home = () => {
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
    <section className='bg-gray-800 backdrop-blur-md mx-3 ml-8 rounded'>
      <h2 className='text-xl text-white/80 font-sans px-5 py-4'>
        Hey admin, Welcome back.
      </h2>
      <div className='grid grid-cols-3 gap-4 px-4 py-3'>
        <Card className='bg-gray-900 bg-opacity-50' title='Total Users'>
          <h2 className='text-white/80 text-xl font-semibold'>
            {loading ? '...' : stats.totalUsers}
          </h2>
        </Card>
        <Card className='bg-gray-900 bg-opacity-50' title='Total Admins'>
          <h2 className='text-white/80 text-xl font-semibold'>
            {loading ? '...' : stats.totalAdmins}
          </h2>
        </Card>
        <Card className='bg-gray-900 bg-opacity-50' title='Total Roles'>
          <h2 className='text-white/80 text-xl font-semibold'>
            {loading ? '...' : stats.totalRoles}
          </h2>
        </Card>
      </div>
    </section>
  );
};

export default Home;
