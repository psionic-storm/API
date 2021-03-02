import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from 'model/user-model';
import { verifyPassword } from 'utils/salt';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
    },
    async (loginId: string, password: string, done) => {
      try {
        const user = await User.findByLoginId(loginId);
        if (!user) {
          return done(null, false, { message: 'User Not Found' });
        }
        if (await verifyPassword(password, user.password, user.salt)) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid Password' });
      } catch (e) {
        return done(e);
      }
    },
  ),
);

export default passport;
